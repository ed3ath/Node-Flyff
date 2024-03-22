QUEST_HEROELE_TRN5 = {
	title = 'IDS_PROPQUEST_INC_001698',
	character = 'MaDa_Condram',
	end_character = 'MaDa_Wendien',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROELE_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_ELEMENTOR',
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
			'IDS_PROPQUEST_INC_001699',
			'IDS_PROPQUEST_INC_001700',
			'IDS_PROPQUEST_INC_001701',
			'IDS_PROPQUEST_INC_001702',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001703',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001704',
		},
		completed = {
			'IDS_PROPQUEST_INC_001705',
			'IDS_PROPQUEST_INC_001706',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001707',
		},
	}
}
