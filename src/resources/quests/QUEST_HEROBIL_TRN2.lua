QUEST_HEROBIL_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001493',
	character = 'MaDa_Ride',
	end_character = 'MaFl_Domek',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HEROBIL_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_DOCHALL', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_HOIREN', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_DOCHALL', monster_id = 'MI_HOIREN', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001494',
			'IDS_PROPQUEST_INC_001495',
			'IDS_PROPQUEST_INC_001496',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001497',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001498',
		},
		completed = {
			'IDS_PROPQUEST_INC_001499',
			'IDS_PROPQUEST_INC_001500',
			'IDS_PROPQUEST_INC_001501',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001502',
		},
	}
}
