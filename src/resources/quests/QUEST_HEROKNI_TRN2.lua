QUEST_HEROKNI_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001373',
	character = 'MaDa_Karanduru',
	end_character = 'MaFl_Hormes',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROKNI_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_PROVGOLDHELM', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_GOLDHELM', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_KIDLER', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_PROVGOLDHELM', monster_id = 'MI_KIDLER', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001374',
			'IDS_PROPQUEST_INC_001375',
			'IDS_PROPQUEST_INC_001376',
			'IDS_PROPQUEST_INC_001377',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001378',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001379',
		},
		completed = {
			'IDS_PROPQUEST_INC_001380',
			'IDS_PROPQUEST_INC_001381',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001382',
		},
	}
}
