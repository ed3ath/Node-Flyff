QUEST_VOCASS_TRN1 = {
	title = 'IDS_PROPQUEST_INC_000735',
	character = 'MaFl_Elic',
	end_character = 'MaFl_Maki',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCASS_BFTRN',
	},
	rewards = {
		gold = 1500,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_FORFORM', quantity = 5, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_GEN_GEM_GEM_FORFORM',
			probability = '3000000000',
			monsters = {
				'MI_MUSHPANG1',
				'MI_MUSHPANG2',
				'MI_MUSHPANG3',
				'MI_MUSHPANG4'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000736',
			'IDS_PROPQUEST_INC_000737',
			'IDS_PROPQUEST_INC_000738',
			'IDS_PROPQUEST_INC_000739',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000740',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000741',
		},
		completed = {
			'IDS_PROPQUEST_INC_000742',
			'IDS_PROPQUEST_INC_000743',
			'IDS_PROPQUEST_INC_000744',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000745',
		},
	}
}
