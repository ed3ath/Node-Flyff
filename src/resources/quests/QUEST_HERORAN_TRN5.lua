QUEST_HERORAN_TRN5 = {
	title = 'IDS_PROPQUEST_INC_000616',
	character = 'MaDa_Rupim',
	end_character = 'MaDa_Kailreard',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HERORAN_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_RANGER',
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_VENHEART', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GUARDMON1', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_VENHEART', monster_id = 'MI_GUARDMON1', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000617',
			'IDS_PROPQUEST_INC_000618',
			'IDS_PROPQUEST_INC_000619',
			'IDS_PROPQUEST_INC_000620',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000621',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000622',
		},
		completed = {
			'IDS_PROPQUEST_INC_000623',
			'IDS_PROPQUEST_INC_000624',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000625',
		},
	}
}
