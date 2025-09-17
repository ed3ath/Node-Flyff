QUEST_HEROBIL_TRN5 = {
	title = 'IDS_PROPQUEST_INC_001528',
	character = 'MaDa_Fera',
	end_character = 'MaDa_Capafe',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HEROBIL_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_BILLPOSTER',
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
			'IDS_PROPQUEST_INC_001529',
			'IDS_PROPQUEST_INC_001530',
			'IDS_PROPQUEST_INC_001531',
			'IDS_PROPQUEST_INC_001532',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001533',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001534',
		},
		completed = {
			'IDS_PROPQUEST_INC_001535',
			'IDS_PROPQUEST_INC_001536',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001537',
		},
	}
}
